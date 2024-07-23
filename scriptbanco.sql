DO $$ 
BEGIN
			
	    -- Verifica se a tabela de agendamento já existe
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'agendamento') THEN
        -- Apaga a tabela existente
        DROP TABLE agendamento;
    END IF;

    	    -- Verifica se a tabela de valorservico já existe
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'valorservico') THEN
        -- Apaga a tabela existente
        DROP TABLE valorservico;
    END IF;


    -- Verifica se a tabela já existe
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'barbearia') THEN
        -- Apaga a tabela existente
        DROP TABLE barbearia;
    END IF;

    -- Cria a tabela
    CREATE TABLE barbearia (
        "idBarbearia" SERIAL PRIMARY KEY,
        "nomeBarbearia" VARCHAR(255) NOT NULL,
        "cnpj" VARCHAR(18) NOT NULL,
        "horarioAbertura" VARCHAR(5),
        "horarioFechamento" VARCHAR(5)
    );
	
	INSERT INTO 
		barbearia ("nomeBarbearia", "cnpj", "horarioAbertura", "horarioFechamento")
	VALUES
		('Barbel', '99.777.777/0001-66', '08:00', '18:00'),
		('Barbearia genérica 2', '99.888.777/0001-66', '10:00', '20:00');
		
		
	    -- Verifica se a tabela de barbeiros já existe
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'barbeiro') THEN
        -- Apaga a tabela existente
        DROP TABLE barbeiro;
    END IF;

    -- Cria a tabela de barbeiros
    CREATE TABLE barbeiro (
        "idBarbeiro" SERIAL PRIMARY KEY,
        "nomeBarbeiro" VARCHAR(255) NOT NULL,
        "cpf" VARCHAR(14) NOT NULL,
        "telefone" VARCHAR(15)
    );
	
	INSERT INTO 
		barbeiro ("nomeBarbeiro", "cpf", "telefone")
	VALUES
		('Roger', '123.456.789-00', '123456789'),
		('João', '987.654.321-00', '987654321');
		
	    -- Verifica se a tabela de serviços já existe
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'servico') THEN
        -- Apaga a tabela existente
        DROP TABLE servico;
    END IF;

    -- Cria a tabela de serviços
    CREATE TABLE servico (
        "idServico" SERIAL PRIMARY KEY,
        "descricaoServico" VARCHAR(255) NOT NULL
    );
	
	INSERT INTO 
		servico ("descricaoServico")
	VALUES
		('Corte simples'),
		('Sobrancelha'),
		('Corte tesoura'),
		('Corte tesoura + maquina');
		
	    -- Cria a tabela de agendamento
    CREATE TABLE agendamento (
        "idAgendamento" VARCHAR(25) NOT NULL PRIMARY KEY,
        "idBarbearia" INT NOT NULL,
        "idBarbeiro" INT NOT NULL,
        "idServico" INT NOT NULL,
        "dataHoraServico" VARCHAR(16) NOT NULL, -- Definido tamanho como 50
        FOREIGN KEY ("idBarbearia") REFERENCES barbearia ("idBarbearia"),
        FOREIGN KEY ("idBarbeiro") REFERENCES barbeiro ("idBarbeiro"),
        FOREIGN KEY ("idServico") REFERENCES servico ("idServico")
    );
	
	INSERT INTO 
		agendamento ("idAgendamento", "idBarbearia", "idBarbeiro", "idServico", "dataHoraServico")
	VALUES
		('1112024-07-07-19:30', 1, 1, 1, '2024-07-07-19:30'),
		('1212024-07-07-20:00', 1, 2, 1, '2024-07-07-20:00'),
		('1112024-07-08-19:30', 1, 1, 1, '2024-07-08-19:30'),
		('1212024-07-08-19:30', 1, 2, 1, '2024-07-08-19:30');

        -- Cria a tabela de valorServico
    CREATE TABLE valorServico (
        "idValorServico" VARCHAR(9) NOT NULL PRIMARY KEY,
        "idBarbearia" INT NOT NULL,
        "idBarbeiro" INT NOT NULL,
        "idServico" INT NOT NULL,
        "valorServico" VARCHAR(10) NOT NULL,
        FOREIGN KEY ("idBarbearia") REFERENCES barbearia ("idBarbearia"),
        FOREIGN KEY ("idBarbeiro") REFERENCES barbeiro ("idBarbeiro"),
        FOREIGN KEY ("idServico") REFERENCES servico ("idServico")
    );
    
    INSERT INTO 
        valorServico ("idValorServico", "idBarbearia", "idBarbeiro", "idServico", "valorServico")
    VALUES
        ('111', 1, 1, 1, '20,00'),
        ('121', 1, 2, 1, '20,00'),
        ('211', 2, 1, 1, '20,00'),
        ('221', 2, 2, 1, '20,00');
		
END $$;


