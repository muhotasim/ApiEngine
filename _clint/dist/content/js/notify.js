(function () {
  const notifierHolder = document.createElement('div');
  const style = document.createElement('style');
  style.innerHTML = `#notifier {
    position: fixed;
    left: 0;
    bottom: 0;
    min-width: 198px;
    min-height: 60px;
    background: rgba(30,30,30,1);
    margin: 10px;
    color: white;
    border-radius: 2px;
    transition-duration: 0.4s;
    opacity: 0;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
    padding: 20px;
}`;
  document.head.appendChild(style);
  notifierHolder.id = 'notifier';
  document.body.appendChild(notifierHolder);
  window.notify = (message, timer) => {
    const notifier = document.getElementById('notifier');
    notifier.innerText = message;
    notifier.style.opacity = 1;
    setTimeout(() => {
      notifier.style.opacity = 0;
    }, timer);
  };
})();
