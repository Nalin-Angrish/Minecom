import { serialize } from 'cookie';

export default async function login(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        console.log(`${process.env.BACKEND}/login`)
        let resp = await fetch(`${process.env.BACKEND}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req.body)
        })
        let data = await resp.json();
        console.log(data);

        res.setHeader('Set-Cookie', [
          serialize('credential', req.body.credential, { path: '/' }), 
          serialize('g_csrf_token', req.body.g_csrf_token, { path: '/' })
        ]);
        res.status(200).json({ message: 'Success' });
    } else {
        // Handle any other HTTP method
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}