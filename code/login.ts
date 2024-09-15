import { Page, Locator, expect } from '@playwright/test';

export class Login {
  constructor(private page: Page) {}


  // login button

  get loginButton(): Locator {
    return this.page.locator('div.user-block__title >> text=Pievienoties');
  }
  


  // email fill
  get emailInput(): Locator {
    return this.page.locator('#user_email');
  }

  // pass fill
  get passwordInput(): Locator {
    return this.page.locator('#user_password');
  }

   // button 
   get submitButton(): Locator {

    return this.page.locator('input[type="submit"][value="Pieslēgties"]');
  }


 
    //welcome massage
    get welcomeMessage(): Locator {
    
        return this.page.locator('div.user-block__title');
    }
    
      // user name expect
      get userName(): Locator {
        return this.page.locator('div.user-block__title strong');
      }
    

    // main funcion for login
    async login(email: string, password: string): Promise<void> {
        console.log('going 1a.lv ...'); 
    
        await this.loginButton.click();
        console.log('button "Pievienoties" clicked.'); 
    
        await this.emailInput.fill(email);
        console.log(`enter email: ${email}`); 
    
        await this.passwordInput.fill(password);
        console.log('enter password.'); 
    
        await this.submitButton.click();
        console.log('button "Pieslēgties" clicked.'); 
    
        await expect(this.welcomeMessage).toContainText('Sveicināti,'); 
        const actualUserName = await this.userName.textContent();
        await expect(this.userName).toContainText('maris'); 
        console.log(`successfully login! Hello,${actualUserName}`);

    }  

}
