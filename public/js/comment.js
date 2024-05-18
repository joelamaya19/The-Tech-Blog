document.getElementById('add-comment-button').addEventListener('click', function () {
    const commentForm = document.getElementById('comment-form');
    commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';
});


const addCommentHandler = async (event) => {
    event.preventDefault();

    const commentContent = document.getElementById('comment-content').value;
    const blogId = document.getElementById('blog-id').value;

    if (!commentContent) {
        alert('Please enter a comment.');
        return;
    }

    try {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: commentContent, blog_id: blogId }),
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Failed to add comment.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

document.getElementById('new-comment-form')
    .addEventListener('submit', addCommentHandler);