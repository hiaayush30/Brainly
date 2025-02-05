export const toastOptions =(darkMode:boolean)=> ({
    autoClose: 1500,
    theme: darkMode ? 'dark' : 'light',
    closeOnClick: true
})