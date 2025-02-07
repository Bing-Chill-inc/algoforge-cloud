<script lang="ts">
	export let type: string = "text";
	export let id: string;
	export let label: string;
	export let value: string = "";
	export let errorMessage: string = "";
	export let required: boolean = false;
</script>

<div class="user-box">
	<input {type} {id} bind:value {required} />
	<label for={id}>{label}</label>
	{#if errorMessage}
		<span class="error-message">{errorMessage}</span>
	{/if}
</div>

<style>
	.user-box {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 35px;
		position: relative;
	}

	.user-box label {
		position: absolute;
		top: 0;
		left: 0;
		padding: 10px 0;
		font-size: 16px;
		color: var(--fgColor);
		pointer-events: none;
		transition: 0.5s;
	}

	.user-box input {
		width: 100%;
		padding: 10px 0;
		font-size: 16px;
		margin-bottom: 5px;
		border: none;
		border-bottom: 1px solid var(--fgColorForward);
		outline: none;
		background: transparent;
		color: var(--fgColor);
	}

	.user-box input:focus ~ label,
	.user-box input:valid ~ label {
		top: -20px;
		left: 0;
		color: var(--titleColor);
		font-size: 12px;
	}

	.error-message {
		color: var(--errorColor);
		font-size: 12px;
	}
</style>
