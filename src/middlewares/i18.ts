import { Request, Response, NextFunction } from 'express-serve-static-core';
import path from 'path';
import i18n  from 'i18n';

const I18 = (req: Request, res: Response, next: NextFunction) => {
  const localesPath: string = path.join(__dirname, '../locales');
  i18n.configure({
    defaultLocale: 'ru',
    locales:['en', 'ru'],
    directory: localesPath,
    objectNotation: true
  });

  if(req.body.variables && req.body.variables.locale){
    i18n.setLocale(req.body.variables.locale);
  }
  next();
}
export default I18;
