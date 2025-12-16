import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule],
  template: `
    @if (isVisible) {
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        
        <div class="bg-white rounded-sm shadow-xl w-full max-w-sm p-6" (click)="$event.stopPropagation()">
          
          <h3 class="text-xl font-bold text-red-600 mb-3">Confirmación de Eliminación</h3>
          <p class="text-gray-700 mb-6">
            {{ message }}
          </p>
          
          <div class="flex justify-end space-x-3">
            
            <button (click)="onCancel()"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-150 cursor-pointer">
              Cancelar
            </button>
            
            <button (click)="onConfirm()"
                class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-800 transition duration-150 cursor-pointer">
              Sí, Eliminar
            </button>
          </div>
          
        </div>
      </div>
    }
  `,
})
export class ConfirmationDialog {
  // 1. Input: Controla si el modal es visible
  @Input() isVisible: boolean = false;
  
  // 2. Input: Mensaje a mostrar
  @Input() message: string = '¿Está seguro de realizar esta acción?';

  // 3. Output: Notifica al padre cuando se confirma
  @Output() confirmed = new EventEmitter<void>();
  
  // 4. Output: Notifica al padre cuando se cancela
  @Output() canceled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.canceled.emit();
  }
}
