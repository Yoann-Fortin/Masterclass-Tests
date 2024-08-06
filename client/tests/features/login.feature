Feature: Login

   Scenario: Visiting the homepage and logging in
      Given the user is on the homepage
      Then they should see a 'Se connecter' button
    
      When the user clicks on the 'Se connecter' button
      Then they are redirected to the login page

      When the user enters their credentials and submits
      Then they are redirected back to the homepage
      And they see the welcome message 'Bon retour parmi nous [prénom de l'utilisateur]!'
