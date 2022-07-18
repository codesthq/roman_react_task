# DOG API React Sample App

The application uses [DOG-API](https://dog.ceo/dog-api/documentation/) to view dog breeds.

## Description of operation
When you run the application for the first time, it retrieves information on all dog breeds available in DOG-API. 

The breeds and sub-breeds are displayed as an alphabetically grouped list.  The dog breed is presented as a button with the breed name as the button label.
Pressing the button opens a modal window in which a random photo of a specific breed is displayed.

It is also possible to download another random photo of a breed by pressing the `Next image` button.

The modal window can be closed by pressing the cross in the upper right corner or by pressing `ESC` on the keyboard.

## Solutions used
[`ReactPortal`](https://pl.reactjs.org/docs/portals.html).
Hooks: `useCallback`, `useMemo`, `useEffect`, custom hook [`useApi`](https://github.com/rom-ero/react-dog-api/blob/master/src/hooks/useApi.js).
Libraries:  [uuid](https://www.npmjs.com/package/uuid), [axios](https://www.npmjs.com/package/axios), [CSSTransition](https://github.com/reactjs/react-transition-group)
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
 