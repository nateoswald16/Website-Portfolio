# Nate's Personal Portfolio Project

#### Video Demo:  https://www.youtube.com/watch?v=DIdnb8f06gg
#### Description: 
This personal portfolio website is designed to showcase my completed projects while providing an interactive space for users to learn more about me and my work. It serves as both a professional presentation tool and a hands-on demonstration of my full-stack development skills. Unlike a typical course project, this portfolio is intended to outlive the CS50 curriculum entirely — it is designed to be a living, evolving product that I will continuously reinvent as I grow as a developer, adding new projects, refining its design, and incorporating new technologies as I acquire them throughout my career.

### Technologies Used

The application is built using a combination of Python, Flask, SQL, Jinja, JavaScript, HTML, CSS, Node.js, React, and Bootstrap. This stack was chosen deliberately to bridge both backend and frontend development within a single cohesive project. Flask serves as the backend web framework, handling routing, session management, and database interaction. SQL is used to persist all project data and admin credentials, while Jinja powers the server-side templating for dynamic page rendering. On the frontend, React is used for building interactive UI components, supported by Bootstrap for responsive layout and utility styling, and vanilla JavaScript for DOM manipulation and dynamic behavior. Node.js supports the frontend tooling and build environment. This combination allowed me to practice integrating multiple paradigms — server-rendered templates alongside client-side rendering — within a real-world application structure.

### Database Design

The SQL database is central to the application's functionality. It stores all project entries, including project names, descriptions, cover images, GitHub repository links, and the technology stacks associated with each project. A separate table holds the admin login credentials used to secure the dashboard. Having a structured relational database means that every project displayed on the public-facing frontend is dynamically pulled from the database rather than hardcoded into the HTML, making the site easily scalable as I add more work over time.

### Public-Facing Interface

On the public side of the site, visitors are greeted with a modern, single-page experience that emphasizes smooth navigation and seamless scrolling across all sections of the homepage. Users can browse through a curated grid of my projects, each displayed as an interactive tile with a cover image. Clicking into a project reveals a detailed description, the technologies used, and a direct link to the corresponding GitHub repository. The homepage also includes an "About Me" section that shares my backstory, how I got into development, and what drives me — giving visitors a sense of who I am beyond just the code. Links to my social profiles are also prominently featured, making it easy for visitors to connect with me on their preferred platforms and explore more of my work.

### Interactive Design and Animations

The design emphasizes a modern and sleek aesthetic with a focus on user engagement. Project tiles and navigation menus feature smooth animations that react to user interaction, giving the interface a polished, app-like feel. One of the most distinctive visual features is the animated background, which uses the Liquid Ether effect from ReactBits — a fluid, flowing animation that responds dynamically to mouse movement, creating an immersive and visually striking browsing experience. This kind of interactive background was chosen specifically to demonstrate frontend creativity and to make the portfolio stand out from static page designs.

### Light and Dark Mode

The site includes a light and dark mode toggle, implemented by using JavaScript to switch CSS classes on the root element of the page. When the user clicks the toggle, a JavaScript event listener applies or removes a class that changes the active color scheme across all styled components. This approach keeps the theming logic simple and maintainable — all colors for both modes are defined in CSS, and JavaScript only handles the class swap. This feature ensures the site is comfortable to browse in any lighting environment and reflects an attention to detail in the user experience.

### Admin Dashboard

Behind the public interface is a secure administrative dashboard that is only accessible after logging in with valid credentials. The login system uses a username and password stored in the SQL database, and access is restricted so that unauthenticated users are redirected away from all admin routes. Once logged in, I have full CRUD (Create, Read, Update, Delete) access to all project entries. I can add new projects with a cover image and GitHub link, edit existing descriptions, update technology tags, and remove projects that are no longer relevant. The dashboard also provides a quick overview of how many total projects are currently listed and a breakdown of the tech stacks represented across all of them, giving me useful insight into the range of my experience at a glance.

### Accessibility

Accessibility was treated as a first-class concern throughout development. ARIA labels are implemented across interactive elements and navigation components to ensure that the site is usable by people relying on screen readers or other assistive technologies. Semantic HTML is used throughout the page structure to reinforce proper document hierarchy and improve compatibility with accessibility tools.

### Challenges and What I Learned

One of the biggest challenges in building this project was managing the boundary between server-rendered content and client-side React components — knowing when to use Jinja templates versus when to hand off rendering to React required careful planning. Integrating the animated background library also required some trial and error, particularly around ensuring it performed well without affecting the responsiveness of the rest of the page. Building the admin authentication system from scratch deepened my understanding of how session-based access control works in Flask. Overall, this project pushed me to think like a real product developer, not just a student completing an assignment — balancing aesthetics, functionality, security, and maintainability all at once.

### Future Plans

Looking ahead, I plan to continue expanding the site well beyond its current state. Future improvements include adding a contact form backed by an email API, implementing pagination or filtering on the projects grid, migrating to a more robust authentication system using hashed passwords, adding per-project case study pages with deeper writeups, and potentially transitioning the backend to a REST API architecture so the frontend can be fully decoupled as a standalone React application. The portfolio will serve as a permanent record of my growth as a developer — always evolving, always improving.

