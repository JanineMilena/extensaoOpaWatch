# Opa!Watch - Extensão de Notificação para Atendimentos Expirados

## Descrição

A extensão Opa!Watch é uma ferramenta que gera notificações push indicando quando existem atendimentos esperando na fila por mais de 10 minutos, além disso ela também altera a aparência destes atendimentos de acordo com o tempo de espera decorrido. Ela foi projetada para auxiliar equipes de suporte a gerenciar de forma mais eficiente o tempo de espera dos atendimentos, garantindo que nenhum cliente seja negligenciado.

## Funcionamento

A extensão Opa!Watch funciona ao monitorar a lista de atendimentos em um determinado host dedicado ao suporte. Caso algum atendimento permaneça na fila por mais de 10 minutos, a extensão exibe uma notificação push para alertar os operadores do suporte sobre a situação. Além disso ela realiza a alteração do estilo dos atendimentos de acordo com o tempo decorrido desde sua abertura, sendo esses:

5 minutos - azul </br>
10 minutos - amarelo </br>
15 minutos - laranja claro </br>
20 minutos - laranja escuro </br>
30 minutos - vermelho </br>

### Observação:

Por se tratar somente de uma extensão a mesma pode operar somente no contexto do cliente, ou seja, ela tem acesso apenas a elementos carregados no navegador.

Além disso, a extensão só pode ler e editar elementos que estão presentes na página da guia ativa. Se a guia não estiver aberta ou se estiver exibindo outro módulo do host onde os elementos configurados para disparar as notificações não existem, a extensão não será capaz de gerar notificações.

Portanto, para que a extensão funcione corretamente, certifique-se de que a guia do host dedicado ao suporte esteja aberta e que os elementos necessários para a detecção de atendimentos expirados estejam carregados na página. Caso contrário, a extensão não terá nenhuma ação sobre o ambiente externo e não será capaz de gerar notificações.

## Restrição de Funcionamento

É importante notar que a extensão Opa!Watch possui uma restrição de funcionamento e é compatível somente com o host dedicado ao suporte em https://suporte.ixcsoft.com.br/. Se desejar utilizar a extensão em outro ambiente, é necessário realizar uma alteração na configuração.

### Como Alterar a Permissão?

Caso queira utilizar a extensão Opa!Watch em um host diferente do suporte atual, siga os passos abaixo para alterar a permissão:

1. Abra o arquivo "manifest.json" no código-fonte da extensão.
2. Procure a seção "host_permissions".
3. Substitua a URL atual "https://suporte.ixcsoft.com.br/*" pelo novo host desejado.
4. Salve as alterações.

Após fazer essa alteração, a extensão estará habilitada para funcionar no novo ambiente.

## Instalação

Para instalar a extensão Opa!Watch, siga os passos abaixo:

1. Baixe o código-fonte da extensão.
2. Abra o Google Chrome e acesse a página de extensões em "chrome://extensions/".
3. Habilite o modo de desenvolvedor (Developer Mode).
4. Clique no botão "Load unpacked" e selecione a pasta onde se encontra o código-fonte da extensão.
5. A extensão Opa!Watch será adicionada ao Chrome e estará pronta para uso.

## Contribuições

Contribuições são bem-vindas! Caso queira melhorar a extensão ou reportar problemas, sinta-se à vontade para abrir uma issue ou enviar um pull request no repositório do projeto em https://github.com/JanineMilena/extensaoOpaWatch.

## Licença

Esta extensão é licenciada sob a licença MIT. </br> 
Leia o arquivo "LICENSE" para mais informações.