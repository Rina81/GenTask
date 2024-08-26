/// <reference types="cypress" />
    


describe('Book the room and check confirmation message', () => {
    it('should open the website without displaying the information banner', () => {
        // Visit the website
        cy.visit('https://automationintesting.online/', {
            onBeforeLoad: (win) => {
                // Inject CSS to hide the banner
                const style = win.document.createElement('style');
                style.innerHTML = '#collapseBanner { display: none !important; }';
                win.document.head.appendChild(style);
            }
        })
        
      

        // Ensure the banner is not visible
        cy.get('#collapseBanner').should('not.be.visible');
        //Click Book this room
        cy.get('button').contains('Book this room').invoke('removeAttr', 'target').click({force:true})
        //Moving to the next month 
      
        cy.get('button').contains('Next').invoke('removeAttr', 'target').click({force:true});
                      
        //Select dates by drug&drop
     
        cy.get('.rbc-date-cell:not(".rbc-off-range")').eq(4).realMouseDown({ button: 'left', position: 'center' })
        .realMouseMove(0, 10, { position: 'center' })
        .wait(200);
        cy.get('.rbc-date-cell:not(".rbc-off-range"):nth(6)').realMouseMove(0, 0, { position: 'center' }).realMouseUp();
        //check that 2 booked nights are displayed in the calendar
       
       // cy.get('.rbc-event-content').contains('title',"2 night(s) - £200").should('be.visible');
        cy.get('[name="firstname"]').eq(0).type('Monique');
        cy.get('[name="lastname"]').eq(0).type('Bouche');
        cy.get('[name="email"]').eq(0).type('mon1213W@gmail.com');
        cy.get('[name="phone"]').eq(0).type('12345612345')
        .wait(500); // Release the mouse button*/
        cy.get('button').contains('Book').click();
        //check the confirmation window 
        cy.get('h3').should('contain','Booking Successful!');
        cy.get('button').contains('Close').click();
        
    });
   
});
describe('Check the booked room is not available for the new booking', () => {
    it.only('should open the website without displaying the information banner', () => {
        // Visit the website
        cy.visit('https://automationintesting.online/', {
            onBeforeLoad: (win) => {
                // Inject CSS to hide the banner
                const style = win.document.createElement('style');
                style.innerHTML = '#collapseBanner { display: none !important; }';
                win.document.head.appendChild(style);
            }
        })
        // Ensure the banner is not visible
        cy.get('#collapseBanner').should('not.be.visible');
        //Click Book this room
        cy.get('button').contains('Book this room').invoke('removeAttr', 'target').click({force:true})
      
        cy.get('button').contains('Next').invoke('removeAttr', 'target').click({force:true});
                
        //Select dates by drug&drop
     
        cy.get('.rbc-date-cell:not(".rbc-off-range")').eq(4).realMouseDown({ button: 'left', position: 'center' })
        .realMouseMove(0, 10, { position: 'center' })
        .wait(200);
        cy.get('.rbc-date-cell:not(".rbc-off-range"):nth(6)').realMouseMove(0, 0, { position: 'center' }).realMouseUp();
        cy.get('[name="firstname"]').eq(0).type('Monique');
        cy.get('[name="lastname"]').eq(0).type('Bouche');
        cy.get('[name="email"]').eq(0).type('mon1213W@gmail.com');
        cy.get('[name="phone"]').eq(0).type('12345612345')
        cy.get('button').contains('Book').click();
        //check the message       
        cy.get('.alert-danger').should('contain','The room dates are either invalid or are already booked');       
        
    });
   
});