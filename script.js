document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Очищаем предыдущие ошибки
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.getElementById('successMessage').style.display = 'none';

    // Получаем значения полей
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment').value.trim();

    let isValid = true;

    // Проверка имени
    if (name === '') {
        document.getElementById('nameError').textContent = 'Пожалуйста, введите ваше имя';
        isValid = false;
    }

    // Проверка email
    if (email === '') {
        document.getElementById('emailError').textContent = 'Пожалуйста, введите email';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Пожалуйста, введите корректный email';
        isValid = false;
    }

    // Проверка комментария
    if (comment === '') {
        document.getElementById('commentError').textContent = 'Пожалуйста, введите комментарий';
        isValid = false;
    }

    // Если все данные валидны
    if (isValid) {
        try {
            // Показываем индикатор загрузки
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Отправка...';
            submitButton.disabled = true;

            // Имитация отправки на сервер (замените на реальный fetch)
            await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация задержки сети

            // Показываем сообщение об успехе
            const successMessage = document.getElementById('successMessage');
            successMessage.innerHTML = `
                <p>Спасибо за ваше сообщение, ${name}!</p>
                <p>Мы ответим вам на email: ${email}</p>
                <p>Ваш комментарий: "${comment}"</p>
            `;
            successMessage.style.display = 'block';

            // Очищаем форму
            this.reset();

        } catch (error) {
            console.error('Ошибка:', error);
            const successMessage = document.getElementById('successMessage');
            successMessage.innerHTML = '<p>Произошла ошибка при отправке. Пожалуйста, попробуйте позже.</p>';
            successMessage.style.display = 'block';
        } finally {
            // Восстанавливаем кнопку
            if (submitButton) {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        }
    }
});