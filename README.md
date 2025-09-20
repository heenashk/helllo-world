home.html

!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DS Study Hub - Home</title>
    <link href="css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">

</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand fw-bold" href="#">DS STUDY HUB</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="notes.html">Study Material</a></li>
        <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
        <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
      </ul>
    </div>
  </div>
</nav>


<!-- 
<%- include("partials/navbar") %> -->

<!-- Hero Section -->
<section class="hero">
  <div class="container-fluid">
    <h1 class="fw-bold">Welcome to Data Science Study Hub</h1>
    <p class="lead">Search for topics or materials to boost your learning journey</p>
    <div class="d-flex justify-content-center mt-4">
      <input type="text" class="form-control w-50 me-2" placeholder="Search for topics or materials">
      <button class="btn btn-primary">Search</button>
    </div>
    <a href="#" class="btn btn-outline-light mt-4">About the Platform</a>
  </div>
</section>

<!-- About Section -->
<section class="py-5">
<div class="custom-container d-flex align-items-center" style="width:500px; height:200px;">
    <img src="/images/a2.png" alt="About" class="mb-3">
    <div>
    <h2>About the Platform</h2>
    <p>We provide a comprehensive collection of resources to help you learn and excel in data science.
       Explore topics from Python programming to machine learning and beyond.</p>
  </div>
  </div>
</section>

<!-- Explore Topics -->
<section class="bg-light py-5">
  <div class="container">
    <h2 class="text-center mb-4">Explore Topics</h2>
    <div class="row g-4">
      <div class="col-md-3 text-center">
        <img src="images/p2.jpg" class="img-fluid mb-2" alt="Python">
        <h5>Python for Data Science</h5>
      </div>
      <div class="col-md-3 text-center">
        <img src="images/m2.jpg" class="img-fluid mb-2" alt="Machine Learning">
        <h5>Machine Learning</h5>
      </div>
      <div class="col-md-3 text-center">
        <img src="images/d3.jpg" class="img-fluid mb-2" alt="Data Visualization">
        <h5>Data Visualization</h5>
      </div>
      <div class="col-md-3 text-center">
        <img src="images/s2.png" class="img-fluid mb-2" alt="Statistics">
        <h5>Statistics & Probability</h5>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<section class="cta-section text-white text-center py-5">
  <div class="container">
    <h3>Join Now and Access 100+ Study Materials</h3>
    <a href="/register" class="btn btn-primary mt-3">Register</a>
  </div>
</section>

<!-- Footer -->
<footer class="bg-dark text-center text-white py-3">
  <p class="mb-0">© 2025 DS Study Hub | All Rights Reserved</p>
</footer>

<script src="js/bootstrap.js"></script>
</body>
</html>



