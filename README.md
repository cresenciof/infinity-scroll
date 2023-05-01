# Example of Infinite Scroll with React Hooks and the Intersection Observer API

This repository contains an example implementation of infinite scrolling using React Hooks and the Intersection Observer API. This technique is very useful when working with very large lists of items, as it allows data to be loaded as the user scrolls down, instead of loading all the data at once.

https://user-images.githubusercontent.com/63727554/235415177-f0269df6-523f-43b8-a447-7a21c5b9adfc.mov

## How to run

To run this example, follow these steps:

1. Clone this repository to your local machine.
2. Open a terminal in the root directory of the repository.
3. Run `yarn install` to install dependencies.
4. Run `yarn dev` to start the application.

## How it works

The implementation uses the useIntersectionObserver hook to detect when the user is approaching the end of the list. At that point, the next page of data is loaded and added to the existing list.

This hook also handles cleanup logic, i.e., it disconnects from the observer when the component is destroyed.
