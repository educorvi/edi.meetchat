<template>
    <div class="p-3">
        <h5 class="m-0">{{chat.name}}</h5>
    </div>

</template>

<script>
    export default {
        name: "chatPreview",
        props: {
            chat: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
