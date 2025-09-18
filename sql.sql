CREATE TABLE 'usuarios' (
    'ID' int(11) PRIMARY KEY 
    'LOGIN'     varchar(50) AUTO_INCREMENT,
    'NOME'      varchar(150) NOT NULL,
    'EMAIL'     varchar(150) NOT NULL,
    'SENHA'     varchar(80)  NOT NULL,
    'ATIVO'     bit(1) DEFAULT b'1'
)