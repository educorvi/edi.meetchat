<template>
    <div id="bar">
        <b-navbar toggleable="lg">
            <b-navbar-brand class="mr-5 brand">
                <b-icon-chat-dots class="mr-3" variant="primary" style="height: 8vh; width: auto"/>
                <h2>MeetChat</h2>
            </b-navbar-brand>
            <b-navbar-toggle target="collapse"></b-navbar-toggle>

            <b-collapse id="collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item>Abmelden</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

</template>

<script>
    //@group Navigation
    //@vuese
    //Navbar zur Navigation

    export default {
        name: "Headbar",
        components: {},
        computed: {
        },
        methods: {

        },
    }
</script>

<style scoped>
    .brand {
        display: flex;
        align-items: center;
    }

    #bar {
        position: sticky;
        /* fixing the position takes it out of html flow - knows
                          nothing about where to locate itself except by browser
                          coordinates */
        left: 0; /* top left corner should start at leftmost spot */
        top: 0; /* top left corner should start at topmost spot */
        /*width: 100vw; !* take up the full browser width *!*/
        z-index: 200; /* high z index so other content scrolls underneath */
        background: white;
        min-height: 10vh;
    }
</style>
