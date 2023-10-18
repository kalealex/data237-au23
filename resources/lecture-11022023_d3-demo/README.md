# Instructions to launch

In the terminal, navigate to the folder containing the file `index.html` using the `cd` command. You need to download a local copy of the entire folder with everything in it in order for this to work. Once inside the correct directory in the terminal, run the following command:

```
python3 -m http.server --bind 127.0.0.1
```

This sets up a localhost server on your machine which you can use for basic web development. View the webpage by navigating to the URL provided in the terminal output. If all is well, the URL should be [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## Web development workflow

Edit the HTML and JavaScript files provided in your preferred text editor. Whenever you'd like to view a change in the browser, save your changes in the text file and refresh the webpage on localhost. Sometimes it helps to use a "hard refresh" which is `Cmd + Shift + R` on a Mac.

You can debug by placing print statements in your JavaScript code. The syntax for this is `console.log("message string", variableName)`. These messages will print in the developer tools panel, which can be accessed in Google Chrome by right-clicking on the webpage and navigating to "Inspect" which will open a developer tools menu. In this menu, you can gain insight into what's happening under the hood of a webpage. It's most helpful to look at the "Console" tab for debugging print statements and to look at the "Elements" tab to see whether HTML elements are rendering on the page as expected.

This is likely a new skill for many of you. It's very normal to struggle at first. Please come to office hours if you're confused.
