<template>
    <footer class="container text-xs font-bold">
        <section class="flex justify-between items-center p-4">
            <p>Copyright © {{ new Date().getFullYear() }} Rodney Sostras</p>
            <ul class="flex items-center gap-x-2.5 list-none">
                <li class="cursor-pointer">
                    <a href="https://github.com/rodneysostras" target="_blank" rel="noopener noreferrer">
                        <img src="@/assets/img/github.svg" alt="Github Rodney Sostras" class="filter-color" />
                    </a>
                </li>
                <li class="cursor-pointer">
                    <a href="https://linkedin.com/in/rodney-sostras" target="_blank" rel="noopener noreferrer">
                        <img src="@/assets/img/linkedin.svg" alt="Linkedin Rodney Sostras" class="filter-color" />
                    </a>
                </li>
            </ul>
        </section>
    </footer>
</template>

<script>
export default {
    name: 'footer',
};
</script>

<style></style>
