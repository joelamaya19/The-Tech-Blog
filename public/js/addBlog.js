document.getElementById('blogForm').addEventListener('submit', async function(event) {
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
});

function toggleForm() {
    var form = document.getElementById("blogForm");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}