async function newPostHandle(event){
    event.preventDefault();

    const title = document.getElementById('postTitle');
    const text_content = document.getElementById('textInput');

    const response = await fetch('api/posts', {
        method: 'post',
        body: JSON.stringify({
            title,
            text_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } 
    alert(response.statusText);
}

document.getElementsByClassName('.newBlog').addEventListener('submit', newPostHandle);