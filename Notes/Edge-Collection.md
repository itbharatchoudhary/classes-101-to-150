# Edge Collection in MongoDB

---

# 1 What is an Edge Collection?

**Edge Collection** ek **separate collection** hoti hai jo **do documents ke beech relationship store karti hai**.

Matlab relationship ko document ke andar embed karne ke bajay (jaise user ke andar followers array store karna), hum **ek alag collection banate hain jo connections ko represent karti hai**.

Ye concept **graph databases** se inspired hai (abhi graph databases jaan-na zaroori nahi hai).

Graph concept me:

* **Node** → User
* **Edge** → Relationship (Follow)

Matlab:

User ek **node** hai
Follow relation ek **edge** hai.

---

# 2 Why Not Store Followers Inside User?

Tum aisa bhi kar sakte ho:

```js
{
  _id: userId,
  name: "Ankur",
  followers: [userId1, userId2, userId3],
  following: [userId4, userId5]
}
```

Matlab user document ke andar hi followers aur following store kar diye.

### Problems:

| Problem             | Why It’s Bad                                                                          |
| ------------------- | ------------------------------------------------------------------------------------- |
| Large array growth  | Agar user popular hai (example: Virat Kohli) to uske millions followers ho sakte hain |
| Document size limit | MongoDB me **16MB document limit** hoti hai                                           |
| Hard to scale       | Har follow/unfollow me **same user document update hota hai**                         |
| Concurrency issues  | Popular users pe **bahut saare simultaneous updates** aayenge                         |

Isliye arrays embed karne ki jagah hum **relationship collection** banate hain.

---

# 3 Edge Collection for Followers

## Collections Structure

### Users Collection

```js
{
  _id: ObjectId,
  username: String,
  email: String
}
```

Ye simple user document hai jisme basic information store hoti hai.

---

### Follows Collection (Edge Collection)

```js
{
  _id: ObjectId,
  follower: ObjectId,   // who follows
  following: ObjectId,  // whom they follow
  createdAt: Date
}
```

Yaha:

* `follower` → source node (jo follow kar raha hai)
* `following` → destination node (jise follow kiya ja raha hai)

Ye document represent karta hai:

> User A follows User B

---

# 4 Real World Example – Instagram Style

Instagram jaisa example lete hain.

Agar **User A ne User B ko follow kiya**

To database me store hoga:

```js
{
  follower: A,
  following: B
}
```

Badi companies isi tarah relationships model karti hain —
**user document ke andar arrays store karke nahi**.

---

# 5 Schema Implementation (Mongoose)

### User Model

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

module.exports = mongoose.model("User", userSchema);
```

Ye **User model** hai jo users collection represent karta hai.

---

### Follow Model (Edge Collection)

```js
const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

followSchema.index({ follower: 1, following: 1 }, { unique: true });

module.exports = mongoose.model("Follow", followSchema);
```

Yaha:

* `follower` → User reference
* `following` → User reference

Aur `timestamps` automatically:

```
createdAt
updatedAt
```

add kar deta hai.

---

### Why Unique Index?

Unique index isliye lagaya hai taaki:

```
User A same User B ko multiple times follow na kar sake
```

Matlab duplicate follow entries prevent ho jati hain.

---

# 6 Follow API (Express)

### Follow User

```js
router.post("/follow/:id", async (req, res) => {
  const followerId = req.user.id;  // from auth middleware
  const followingId = req.params.id;

  if (followerId === followingId) {
    return res.status(400).json({ message: "You can't follow yourself" });
  }

  const follow = await Follow.create({
    follower: followerId,
    following: followingId
  });

  res.json({ message: "Followed successfully" });
});
```

Yaha kya ho raha hai:

1. `req.user.id` → jo user currently logged in hai
2. `req.params.id` → jise follow karna hai
3. Check kiya gaya hai ki user **khud ko follow na kare**
4. Fir **Follow collection me new document create hota hai**

---

### Unfollow User

```js
router.delete("/unfollow/:id", async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  await Follow.findOneAndDelete({
    follower: followerId,
    following: followingId
  });

  res.json({ message: "Unfollowed successfully" });
});
```

Yaha:

Agar user unfollow karta hai to **Follow document delete ho jata hai**.

---

# 7 Getting Followers List

```js
const followers = await Follow.find({ following: userId })
  .populate("follower", "username email");
```

Iska matlab:

> Mujhe sab users do jo **is user ko follow kar rahe hain**

Aur `populate` follower user ka data fetch karta hai.

---

# 8 Getting Following List

```js
const following = await Follow.find({ follower: userId })
  .populate("following", "username email");
```

Iska matlab:

> Ye user **kin users ko follow karta hai**

---

# 9 Counting Followers Efficiently

Sab documents fetch karne ke bajay directly count kar sakte hain:

```js
const count = await Follow.countDocuments({ following: userId });
```

Ye **bahut fast hota hai**.

---

# 10 Indexing for Performance

Indexes zaroor lagane chahiye:

```js
followSchema.index({ follower: 1 });
followSchema.index({ following: 1 });
```

Kyuki most queries hongi:

* **X ko kaun follow karta hai?**
* **X kin users ko follow karta hai?**

Agar index nahi hoga:

Full collection scan hoga.

Agar index hoga:

Query **O(log n)** speed me run hogi.

---

# 11 Benefits of Edge Collection

| Feature                  | Benefit                                   |
| ------------------------ | ----------------------------------------- |
| Separate collection      | Data clean aur organized rehta hai        |
| Scales to millions       | Document size problem nahi hoti           |
| Easy querying            | Simple `find` queries                     |
| Works well with sharding | Large scale systems handle kar sakte hain |
| Graph-like modeling      | Complex relationships support karta hai   |

---

# 12 Advanced: Mutual Followers (Common Friends)

```js
db.follows.aggregate([
  { $match: { follower: userA } },
  {
    $lookup: {
      from: "follows",
      localField: "following",
      foreignField: "follower",
      as: "mutual"
    }
  }
]);
```

Edge collection ki wajah se **graph-style queries possible ho jati hain**.

Jaise:

* mutual followers
* common friends
* network connections

---

# 13 When To Use Edge Collection?

Edge collection tab use karo jab:

* **Many-to-many relationships** ho
* **High scalability** chahiye
* Relationship me **extra metadata** ho (timestamp, status)
* Social features ho (followers, friends, likes, connections)

Avoid karo jab:

* Relationship **small aur limited** ho
* Application **low scale** ho

