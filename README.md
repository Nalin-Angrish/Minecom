# Minecom
A Minecraft community management system.

## Getting Started
1. Make sure you have the following software installed:
    - git
    - Python (Latest version preferred)
    - Node.js (Latest version preferred)
    - VSCode (preferred, otherwise your opinion will be rejected)
2. Clone the project by running the following command in the terminal: `git clone https://github.com/Nalin-Angrish/Minecom`.
3. Move into the project directory by running `cd Minecom`.
4. The backend and frontend now need to be run simultaneously. So, open another terminal in this directory, and use both of these terminals for either segments.

### For backend
5. Install all python requirements by running `pip install -r requirements.txt`. You can also use a [virtual environment](https://docs.python.org/3/library/venv.html) if you have a lot of projects that require different versions of different libraries.
6. Whenever there is a database schema change, you need to run `python3 manage.py makemigrations` and `python3 manage.py migrate`.
7. To run the server, run `python3 manage.py runserver 8080`. This will run the backend on `http://localhost:8080/`.

### For frontend
5. Move into the `frontend` directory.
6. Run `npm install`.
7. Run `npm run dev`. This will run the frontend on `http://localhost:3000/`.

## Studying the file structure
- `manage.py`: Django controlling script. This is used to interact with the django application.
- `db.sqlite3`: Database.
- `minecom`: This is the main folder containing the files for the backend.
- `frontend`: This is the main folder containing the files for the frontend.

### How next.js pages work
Go in `frontend/pages/app.js`. This file is used to get the output for `http://localhost:3000/app`. If we create a file by a name like `frontend/pages/[filename].js`, the file will be used to generate the output for `http://localhost:3000/filename`.  
These files have code generally in the format:  
```
export default function FileName(){
  // Some JS Code and stuff
  return (
    <>
    <!-- Some HTML+CSS Code and stuff -->
    </>
  )
}
```
Detailed explanation of how to pass parameters to html tags can be found online. (Here's some cool stuff)[https://www.youtube.com/watch?v=s2skans2dP4].