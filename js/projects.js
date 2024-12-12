document.addEventListener("DOMContentLoaded", () => {
  setupProjects()
})

function setupProjects() {
  const projectsData = [
    {
      type: "MCM",
      name: "Inspire",
      id: "Inspire",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia iste modi optio quod ex earum aspernatur, animi similique reiciendis est excepturi iure quis! Voluptas, ad natus. Dolore temporibus explicabo placeat, suscipit expedita sapiente, deserunt enim fugit impedit deleniti laudantium obcaecati facere dolor nostrum velit, magnam animi sequi necessitatibus eligendi sit inventore debitis id.",
      client: "XYZ Corporation",
      students: ["John Doe", "Jane Smith"],
      images: [
        "../images/works_takameru_branding_00.jpg",
        "../images/works_takameru_branding_01.jpg",
        "../images/works_takameru_logo.jpg",
      ],
      clickable: true,
    },
    {
      type: "MCM",
      name: "Campus TV",
      id: "Campus TV",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia iste modi optio quod ex earum aspernatur, animi similique reiciendis est excepturi iure quis! Voluptas, ad natus. Dolore temporibus explicabo placeat, suscipit expedita sapiente, deserunt enim fugit impedit deleniti laudantium obcaecati facere dolor nostrum velit, magnam animi sequi necessitatibus eligendi sit inventore debitis id.",
      client: "XYZ Corporation",
      students: ["John Doe", "Jane Smith"],
      images: [
        "../images/works_takameru_branding_00.jpg",
        "../images/works_takameru_branding_01.jpg",
        "../images/works_takameru_logo.jpg",
      ],
      clickable: true,
    },
    // More projects can be added here...
  ]

  const projectContainer = document.querySelector(".project-listing")
  projectsData.forEach((project) => {
    const projectDiv = document.createElement("div")
    projectDiv.className = project.clickable ? "clickable" : ""
    projectDiv.textContent = project.name
    projectDiv.onclick = () => openPopup(project)
    document.querySelector(`.project-${project.type.toLowerCase()}`).appendChild(projectDiv)
  })

  setupPopupClose()
}

function openPopup(project) {
  // Set and display project details
  document.getElementById("popupTitle").textContent = project.name
  document.getElementById("popupDescription").textContent = project.description
  document.getElementById("popupClient").textContent = "Client: " + project.client
  populateImages(project.images)
  populateStudents(project.students)
  displayPopup()
}

function populateImages(images) {
  const imagesContainer = document.getElementById("popupImages")
  imagesContainer.innerHTML = ""
  images.forEach((image, index) => {
    const img = document.createElement("img")
    img.src = image
    img.style.width = index === 0 ? "100%" : "50%"
    img.style.display = "inline-block"
    imagesContainer.appendChild(img)
  })
}

function populateStudents(students) {
  const studentList = document.getElementById("popupStudents")
  studentList.innerHTML = ""
  students.forEach((student) => {
    const li = document.createElement("li")
    li.textContent = student
    studentList.appendChild(li)
  })
}

function displayPopup() {
  const popup = document.getElementById("projectPopup")
  popup.style.display = "flex"
  popup.style.pointerEvents = "none" // Allow interactions within the popup

  // Slide in the popup from the right
  gsap.fromTo(popup, { x: "100%", opacity: 1 }, { x: "0%", opacity: 1, duration: 0.5 })

  // Slide the project-listing to the left
  const projectListing = document.querySelector(".project-listing")
  gsap.to(projectListing, { x: "-25%", duration: 0.5 })
}

function closePopup() {
  const popup = document.getElementById("projectPopup")
  const projectListing = document.querySelector(".project-listing")

  if (popup.style.display === "flex") {
    // Slide out the popup to the right
    gsap.to(popup, {
      x: "100%",
      duration: 0.5,
      onComplete: () => {
        popup.style.display = "none"
        popup.style.pointerEvents = "none" // Disable interactions when not visible
        popup.style.x = "0%" // Reset position for next opening
      },
    })

    // Slide back the project-listing to its original position
    gsap.to(projectListing, { x: "0%", duration: 0.5 })
  }
}

function setupPopupClose() {
  const popup = document.getElementById("projectPopup")
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup()
    }
  })
  document.querySelector(".popup-content").addEventListener("click", (event) => {
    event.stopPropagation()
  })
}
