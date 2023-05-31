export function queryAssignedNodes<T extends Node[]>(target: HTMLElement, slotName: string): T {
  const el = target.shadowRoot ? target.shadowRoot : target;
  const slotEl = el.querySelector<HTMLSlotElement>(`slot[name=${slotName}]`);

  return (slotEl?.assignedNodes() as T) ?? [];
}
