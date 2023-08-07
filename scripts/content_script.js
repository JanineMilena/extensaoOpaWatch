const FIVE_MINUTES = 5;
const TEN_MINUTES = 10;
const FIFTEEN_MINUTES = 15;
const TWENTY_MINUTES = 20;
const THIRTY_MINUTES = 30;

let lastNotificationTime = null; // Variável para armazenar o horário da última notificação

function checkQueueElementsForNotification() {
  const selectedElement = document.querySelector('.item.selected');
  if (selectedElement && selectedElement.getAttribute('data-id') === 'aguard') {
    const elements = document.querySelectorAll('.data_hora_ultima_msg');
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    elements.forEach((element) => {
      const content = element.textContent.trim();
      const [hour, minute] = content.split(':');
      const elementMinutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);

      const parentElement = element.closest('.atend_aguard');
      const titleElement = parentElement.querySelector('.title');
      const client = titleElement.textContent.trim();

      if (currentMinutes - elementMinutes === TEN_MINUTES && lastNotificationTime !== content) {
        chrome.runtime.sendMessage({ type: 'achieved_condition', content: client });
        lastNotificationTime = content; // Armazenar o horário da última notificação

        // Aplicar estilo somente para o elemento específico que atendeu à condição
        parentElement.classList.add('expired');
        void parentElement.offsetWidth; // Forçar a atualização da animação ao adicionar a classe 'expired'
      }
    });
  }
}

function applyExpiredStyle() {
  const elements = document.querySelectorAll('.atend_aguard');
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  elements.forEach((element) => {
    element.classList.remove('expired', 'five-minutes', 'ten-minutes', 'fifteen-minutes', 'twenty-minutes', 'thirty-minutes');
    void element.offsetWidth; // Forçar a atualização da animação ao remover as classes

    const contentElement = element.querySelector('.data_hora_ultima_msg');
    if (!contentElement) {
      element.classList.add('thirty-minutes');
    } else {
      const content = contentElement.textContent.trim();
      const [hour, minute] = content.split(':');

      if (isNaN(hour) || isNaN(minute)) {
        element.classList.add('thirty-minutes', 'expired');
      } else {
        const elementMinutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);
        const timeInQueue = currentMinutes - elementMinutes;

        if (timeInQueue >= FIVE_MINUTES && timeInQueue < TEN_MINUTES) {
          element.classList.add('five-minutes');
        } else if (timeInQueue >= TEN_MINUTES && timeInQueue < FIFTEEN_MINUTES) {
          element.classList.add('ten-minutes');
        } else if (timeInQueue >= FIFTEEN_MINUTES && timeInQueue < TWENTY_MINUTES) {
          element.classList.add('fifteen-minutes');
        } else if (timeInQueue >= TWENTY_MINUTES && timeInQueue < THIRTY_MINUTES) {
          element.classList.add('twenty-minutes');
        } else if (timeInQueue >= THIRTY_MINUTES) {
          element.classList.add('thirty-minutes');
        }

        if (timeInQueue >= FIVE_MINUTES) {
          element.classList.add('expired');
          void element.offsetWidth; // Forçar a atualização da animação ao adicionar a classe 'expired'
        }
      }
    }
  });
}

// Execute a função inicialmente
checkQueueElementsForNotification();
applyExpiredStyle();

// Defina um intervalo que executa a função a cada minuto
setInterval(() => {
  notificationTriggered = false; // Resetar a variável para permitir que a notificação seja disparada novamente no próximo minuto
  checkQueueElementsForNotification();
  applyExpiredStyle();
}, 60 * 1000);

// Aplica o estilo aos elementos expirados quando o conteúdo da página é carregado
document.addEventListener('DOMContentLoaded', applyExpiredStyle);

// Configura um MutationObserver para aplicar o estilo aos novos elementos adicionados com a classe 'atend_aguard'
const observer = new MutationObserver(applyExpiredStyle);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});