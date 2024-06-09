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
// db.collection("posts")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       console.log(doc.data(), doc.id);
//       addPosts(doc.data(), doc.id);
//     });
//   })
//   .catch((err) => console.log(err));

//getting real-time data from the database
const unsuscribe = db.collection("posts").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((docChange) => {
    const changes = docChange.doc;
    if (docChange.type === "added") {
      addPosts(changes.data(), changes.id);
    } else if (docChange.type === "removed") {
      deletePost(changes.id);
    }
  });
});

//adding data to the database
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const now = new Date();
  const post = {
    title: form.post.value.trim(),
    created_at: firebase.firestore.Timestamp.fromDate(now),
  };
  form.reset();

  db.collection("posts")
    .add(post)
    .then(() => console.log("Post added successfully"))
    .catch((err) => console.log(err));
});

// deleting data from the database
list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.parentElement.getAttribute("data-id");
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => console.log("Post delected😥"))
      .catch((err) => console.log(err));
  }
});
