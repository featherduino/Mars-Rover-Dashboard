let store = {
    user: { name: 'Student' },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
};

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState);
    render(root, store);
};

const render = async (root, state) => {
    root.innerHTML = App(state);
};

// create content
const App = (state) => {};

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `;
    }

    return `
        <h1>Hello!</h1>
    `;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date();
    const photodate = new Date(apod.date);
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate()) {
        getImageOfTheDay(store);
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === 'video') {
        return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
    } else {
        return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
    }
};

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state;

    fetch(
        `https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/apod`
    )
        .then((res) => res.json())
        .then((apod) => updateStore(store, { apod }));

    return data;
};