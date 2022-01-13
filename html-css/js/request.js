const form = document.querySelector('#new_post');
const postsList = document.querySelector('table');  //THIS IS NEEDED

form.addEventListener('submit', submitPost);

// Fetch all posts as soon as app is loaded
getAllPosts();   // THIS WAS MISSING





// POST FLOW
// index
function getAllPosts(){
    fetch('http://localhost:3000/posts')
        .then(r => r.json())
        .then(appendPosts)
        .catch(console.warn)
};

// create
function submitPost(e){
    e.preventDefault();

    const postData = {
        title: e.target.title.value,
        name: e.target.name.value,
        body: e.target.body.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/posts', options)
        .then(r => r.json())
        .then(appendPost)
        .then(() => e.target.reset())
        .catch(console.warn)
};



function appendPosts(data){
    data.posts.forEach(appendPost);
};

function appendPost(postData){
    const newRow = document.createElement('tr');
    const postLi = formatPostTr(postData, newRow)
    postsList.append(newRow);
};


function formatPostTr(post, tr){
    const titleTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const bodyTd = document.createElement('td');

    titleTd.textContent = post.title
    nameTd.textContent = post.name
    bodyTd.textContent = post.body

    tr.append(titleTd)
    tr.append(nameTd)
    tr.append(bodyTd)

    return tr
}





// const form = document.querySelector('#new_post');

// form.addEventListener('submit', postBook);


// async function getAllPosts(){
//     try {
//         const response = await fetch('http://localhost:3000/posts');
//         const data = await response.json();
//         return data;
//     } catch (err) {
//         console.warn(err);
//     }

// }

// async function postBook(e){
//     e.preventDefault();
//     try {
//         const options = {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
//         }
        
//         const response = await fetch('http://localhost:3000/posts', options);
//         const { id, err } = await response.json();
//         if(err) { 
//             throw Error(err) 
//         } else {
//             window.location.hash = `#posts/${id}`
//         }
//     } catch (err) {
//         console.warn(err);
//     }
// }

// module.exports = {
//     postBook,
//     getAllPosts
// }