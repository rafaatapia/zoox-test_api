interface IMailConfig {
  driver: 'ethereal' | 'smtp' | 'ses';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
  config: {
    smtp: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      name: 'Rafael Tapia',
      email: 'rafael@tapia.com.br',
    },
  },

  config: {
    smtp: {
      host: process.env.MAIL_SMTP_HOST || 'smtp.example.com',
      port: process.env.MAIL_SMTP_PORT || 587,
      secure: process.env.MAIL_SMTP_SECURE || false,
      auth: {
        user: process.env.MAIL_SMTP_USER,
        pass: process.env.MAIL_SMTP_PASS,
      },
    },
  },
} as IMailConfig;
