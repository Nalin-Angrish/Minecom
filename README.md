# Minecom
A Minecraft community management system.

## Getting Started
1. Make sure you have the following software installed:
    - git
    - Python (Latest version perferred)
    - VSCode (preferred, otherwise your opinion will be rejected)
2. Clone the project by running the following command in the terminal: `git clone https://github.com/Nalin-Angrish/Minecom`.
3. Move into the project directory by running `cd Minecom`.
4. Install all python requirements by running `pip install -r requirements.txt`. You can also use a [virtual environment](https://docs.python.org/3/library/venv.html) if you have a lot of projects that require different versions of different libraries.
5. Whenever there is a database schema change, you need to run `python3 manage.py makemigrations` and `python3 manage.py migrate`.
6. To run the server, run `python3 manage.py runserver`.