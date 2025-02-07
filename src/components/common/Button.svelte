<script lang="ts">
	export let type: "button" | "reset" | "submit" | null = "button";
	export let disabled: boolean = false;
</script>

<button {type} {disabled}>
	<slot />
</button>

<style>
	button {
		display: inline-block;
		padding: 12px 24px;
		font-size: 16px;
		color: var(--bgColor);
		background-color: var(--titleColor);
		text-decoration: none;
		border-radius: 5px;
		margin-top: 20px;
		cursor: pointer;
		transition:
			border 0.6s ease,
			box-shadow 0.6s ease,
			color 0.3s ease,
			background-color 0.3s ease;
		border: 0.1vw solid transparent;
	}

	button:hover {
		background-color: var(--fgColorHover);
		border: 0.1vw solid var(--fgColorForward);
		box-shadow: 0 0 0.5vw var(--fgColor);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
