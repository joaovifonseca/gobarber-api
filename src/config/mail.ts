interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        }
    }
};

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            email: 'joaovfonseca@outlook.com',
            name: 'João Vitor Fonseca da Silva'
        }
    }
} as IMailConfig;