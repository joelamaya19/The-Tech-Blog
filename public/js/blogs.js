const createBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const contents = document.getElementById('contents').value;

    try {
        const response = await fetch('/api/blogs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                contents: contents
            })
        });

        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert('Error creating blog post!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
};

const delBlogButtonHandler = async (event) => {
    console.log('Clicked element:', event.target); // Debugging line
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog');
        }
    }
};

const delCommentButtonHandler = async (event) => {
    console.log('Clicked element:', event.target); // Debugging line
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete comment');
        }
    }
};

document.getElementById('blogForm')
    .addEventListener('submit', createBlogHandler);

document
    .querySelector('.blog-section')
    .addEventListener('click', delBlogButtonHandler);

document
    .querySelector('.comment-section')
    .addEventListener('click', delBlogButtonHandler);

function toggleForm() {
    let form = document.getElementById("blogForm");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}