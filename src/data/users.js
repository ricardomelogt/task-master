export const users = [
    {
        email: "admin@teste.com",
        password: "123",
        name: "Administrador",
        cpf: "12345678900",
        birth: "1991-02-18",
        tasks: [
            {
                isDone: false,
                title: 'Task title',
                date: '03-01-2022',
                description: '...'
            },
            {
                isDone: false,
                title: 'Task title',
                date: '03-01-2022',
                description: '...'
            },
            {
                isDone: true,
                title: 'Comprar pão no mercado',
                date: '05-01-2022',
                description: '10 pães bolacha, 05 franceses e 08 pães doces.'
            }
        ]
    },
    {
        email: "ricardo@teste.com",
        password: "123",
        name: "Ricardo Melo",
        cpf: "12345678901",
        birth: "1991-02-18",
        tasks: []
    }
];