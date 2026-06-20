# Task Manager Application

A fully interactive Task Manager Application built using **HTML, CSS, and Vanilla JavaScript**.

The goal of this project was not only to build a task manager, but also to gain a deeper understanding of how browsers work internally, how the DOM is manipulated, and how JavaScript events flow through the document.

## Features

### Task Management

* Create tasks dynamically
* Edit existing tasks
* Mark tasks as completed
* Move completed tasks to a separate section
* Delete tasks
* Category-based task organization

### Theme Toggle

* Light Mode / Dark Mode
* Theme stored using custom data attributes

### Event Handling

* Add Task
* Edit Task
* Complete Task
* Delete Task

### Event Delegation

* Single event listener attached to parent container
* Actions handled through event bubbling and target detection

### Event Propagation Demonstration

* Demonstrates Event Bubbling
* Demonstrates Event Capturing
* Visual console showing execution order

### Browser Rendering Pipeline Visualization

A dedicated section explaining:

HTML
↓
Parsing
↓
Tokenization
↓
DOM Tree

CSS
↓
CSSOM Tree

DOM Tree + CSSOM Tree
↓
Render Tree

---

## Concepts Implemented

### DOM Manipulation

The project dynamically creates and updates UI elements using JavaScript DOM APIs.

Methods used:

* createElement()
* createTextNode()
* append()
* appendChild()
* prepend()
* before()
* after()
* replaceWith()
* remove()

---

## Attributes vs Properties

This project demonstrates the difference between HTML attributes and DOM properties.

For e.g. :

```javascript
input.value
```

```javascript
input.getAttribute("value")
```

### Difference

`getAttribute()` reads the value originally defined in HTML.

`value` reads the current value of the input after user interaction.

---

## Custom Data Attributes

Task cards use custom data attributes:

```html
data-id
data-status
data-category
```

Methods practiced:

```javascript
getAttribute()
setAttribute()
removeAttribute()
hasAttribute()
dataset
```

---

## Event Handling

User interactions are handled using:

```javascript
addEventListener()
```

Features implemented through event listeners:

* Add Task
* Edit Task
* Delete Task
* Complete Task
* Theme Toggle

---

## Event Delegation

Instead of attaching separate event listeners to every task card, a single listener is attached to the parent container.

Benefits:

* Better performance
* Cleaner code
* Easier maintenance
* Works automatically for dynamically created elements

---

## Event Propagation

### Event Bubbling

When a child element is clicked:

```text
Child
Parent
Grandparent
```

The event travels upward through the DOM tree.

### Event Capturing

When capturing mode is enabled:

```text
Grandparent
Parent
Child
```

The event travels from the outermost ancestor toward the target element.

---

## Browser Rendering Pipeline

### Parsing

The browser reads HTML and CSS files.

### Tokenization

The browser breaks the source code into tokens that it can understand.

### DOM Tree

HTML is converted into a tree-like structure called the Document Object Model (DOM).

### CSSOM Tree

CSS is converted into another tree called the CSS Object Model (CSSOM).

### Render Tree

The browser combines the DOM Tree and CSSOM Tree to create the Render Tree.

Only elements that need to be displayed are included in the Render Tree.

---

## Technologies Used

* HTML5
* SCSS - css preprocessor
* Vanilla JavaScript

No frameworks or external libraries were used.

---

## Project Structure

```text
project/
│
├── index.html
├── script.js
├── style.css
├── style.css.map
├── style.scss
└── README.md
```

---

## What I Learned

Through this project I gained practical experience with:

* Dynamic DOM Manipulation
* Event Handling
* Event Delegation
* Event Bubbling
* Event Capturing
* Browser Rendering Pipeline
* Custom Data Attributes
* Theme Management
* Building interactive UI using pure JavaScript

---

## Live Demo

https://task8-cohort-3-0.vercel.app/

