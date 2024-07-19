
<section><slot/></section>

<style lang="scss">
    @use '$lib/styles/media-queries.scss' as *;
    
    section {
        display: flex;
        flex-direction: column;
        gap: var(--gap-normal);
        align-items: start;

        --font-size: 1.1em;
            
        @include lt-lg {
            // flex-direction: row;
            align-items: center;
        }
    }
</style>
