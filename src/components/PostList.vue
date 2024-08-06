<template>
    <div>
    <h1>{{ post_title }}</h1>
    </div>
</template>
<script>
    export default {
        name: 'PostList',
        props:{
            post_title: String,
        }
    }

</script>