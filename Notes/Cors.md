# Cross-Origin Resource Sharing

## CORS -> Cross-Origin Resource Sharing

- ek browser ki security setting hai jo control karti hai ki ek website doosri website ke data ko browser ke andar kaise access kar sakti hai.  Ye Same-Origin Policy (SOP) ko relax karne ka ek secure tarika hai, jo by default har cross-origin request ko block kar deta hai. 

### For an interview :  

> "CORS is a browser-enforced protocol that uses HTTP headers like `Access-Control-Allow-Origin` to allow a server to grant permission for other origins to access its resources. For non-simple requests (e.g., `PUT`, `DELETE`, or with custom headers), the browser first sends a preflight `OPTIONS` request to verify the server's policy before the actual request is made." 


---


### Key interview points: 

*   **Preflight Requests:** Used for non-simple requests to check server permissions. 
*   **Critical Headers:** `Origin`, `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`. 
*   **Credentials:** Use `Access-Control-Allow-Credentials: true` only with specific origins, not wildcards.


---


### Kaise Kaam Karta Hai 

1.  **Request Bhejna:** Jab aapki website (`your-site.com`) kisi doosri website (`api.example.com`) se data maangti hai, to browser `Origin: your-site.com` header bhejta hai. 
2.  **Permission Maangna (Preflight):** Agar request "complex" hai (jaise `PUT`, `DELETE`, ya custom header), to browser pehle ek `OPTIONS` request (preflight) bhejta hai: "Bhai, kya main `your-site.com` se `api.example.com` pe request bhej sakta hoon?"
3.  **Server ka Jawab:** Server apne response mein headers bhejta hai:
    *   `Access-Control-Allow-Origin: your-site.com` (Ya `*` for public APIs)
    *   `Access-Control-Allow-Methods: GET, POST` (Allowed methods)
    *   `Access-Control-Allow-Credentials: true` (Agar cookies chahiye)
4.  **Browser ka Faisla:** Agar server ke headers sahi hain, to browser asli request ko proceed kar deta hai aur response ko JavaScript ko dikhata hai. Nahi to, CORS error aata hai. 


===
