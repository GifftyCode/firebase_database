const list = document.querySelector("ul");
const form = document.querySelector("form");
const button = document.querySelector("button");

// updated the ui with the data gotten
const addPosts = (post, id) => {
  const time = post.created_at.toDate();
  let html = `
  <li data-id = ${id}>
    <div>${post.title}</div>
    <div>${time}</div>
    <button class = 'btn btn-danger btn-sm my-2'>delete</button>
  </li>
  `;

  list.innerHTML += html;
};

// getting data from the database
db.collection("posts")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data(), doc.id);
      addPosts(doc.data(), doc.id);
    });
  })
  .catch((err) => console.log(err));
