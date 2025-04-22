
<script>
    const items = ["Profile", "Settings"]
</script>

<div class="flex flex-col items-start justify-start bg-muted/40  p-4 gap-y-3 rounded-md border">
    {#each items as item, index}
        <span class="hover:bg-zinc-800 w-full cursor-pointer px-4 py-3 rounded-md">
            {item}
        </span>

        {#if index !== items.length - 1}
            <div class="h-[1px] w-full bg-border"></div>
        {/if}
    {/each}
</div> 