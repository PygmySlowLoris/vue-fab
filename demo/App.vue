<template>
    <div id="app">
        <img width="400px" src="./assets/logo.png">
        <h1></h1>
        <h2>Floating Action Button</h2>
        <fab
                :actions="fabActions"
                @cache="cache"
                @alertMe="alert"
        ></fab>
        <fab bg-color="#d11014"
             position="top-left"
             :actions="fabActions"
             @cache="cache"
             @alertMe="alert"
        ></fab>
        <fab bg-color="#119912"
             position="bottom-left"
             :actions="fabActions"
             @cache="cache"
             @alertMe="alert"
             :ripple="{show: true,color: 'dark'}"
        ></fab>
        <fab bg-color="#102499"
             position="top-right"
             :actions="fabActions"
             @cache="cache"
             @alertMe="alert"
             :ripple="{show: true,color: 'light'}"
        ></fab>
    </div>
</template>

<script>
    import FAB from '../src/FAB.vue';
    export default {
        name: 'app',
        components: {
            fab: FAB
        },
        data(){
            return {
                fabActions: [
                    {
                        name: 'cache',
                        icon: 'cached'
                    },
                    {
                        name: 'alertMe',
                        icon: 'add_alert'
                    }
                ]
            }
        },
        methods: {
            cache(){
                console.log('Cache Cleared');
            },
            alert(){
                alert('Clicked on alert icon');
            }
        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
