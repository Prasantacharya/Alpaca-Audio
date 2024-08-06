
export const headerNav = () => {


}

const themeSwitcher = () => {
    return (
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost">
            Themes
          </div>
          <div
            tabindex="0"
            class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 shadow">
            <div class="join join-vertical">
              <input
                type="radio"
                name="theme-buttons"
                class="btn theme-controller join-item"
                aria-label="Default"
                value="default" />
              <input
                type="radio"
                name="theme-buttons"
                class="btn theme-controller join-item"
                aria-label="Dracula"
                value="dracula" />
              <input
                type="radio"
                name="theme-buttons"
                class="btn theme-controller join-item"
                aria-label="Nord"
                value="nord" />
            </div>
          </div>
        </div>
    );
}