import fs from 'fs';
import ejs from 'ejs';

class PasswordTemplate {
  public generatePasswordTemplate(name: string, password: string): string {
    return ejs.render(fs.readFileSync(__dirname + '/password.template.ejs', 'utf-8'), {
      name,
      password,
      image_url: 'https://w7.pngwing.com/pngs/120/102/png-transparent-padlock-logo-computer-icons-padlock-technic-logo-password-lock.png'
    });
  };
};

export const passwordTemplate: PasswordTemplate = new PasswordTemplate();