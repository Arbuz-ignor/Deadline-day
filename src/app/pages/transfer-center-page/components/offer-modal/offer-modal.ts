import { Component, inject } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import type { OfferPayload } from '../../../../core/models/deal.model';

import type { OfferModalData } from '../../../../core/models/game-view.model';

@Component({
  selector: 'app-offer-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './offer-modal.html',
  styleUrl: './offer-modal.scss',
})
export class OfferModal {
  readonly data = inject<OfferModalData>(DIALOG_DATA);

  private readonly dialogRef = inject<DialogRef<OfferPayload>>(DialogRef);

  readonly form = new FormGroup({
    transferFeeMillions: new FormControl<number | null>(
      this.data.previousOffer ? this.data.previousOffer.transferFee / 1_000_000 : null,
      {
        validators: [Validators.required, Validators.min(1)],
      },
    ),

    weeklyWageThousands: new FormControl<number | null>(
      this.data.previousOffer ? this.data.previousOffer.weeklyWage / 1_000 : null,
      {
        validators: [Validators.required, Validators.min(1)],
      },
    ),
  });

  submitOffer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const transferFeeMillions = this.form.controls.transferFeeMillions.value;

    const weeklyWageThousands = this.form.controls.weeklyWageThousands.value;

    if (transferFeeMillions === null || weeklyWageThousands === null) {
      return;
    }

    const offer: OfferPayload = {
      transferFee: transferFeeMillions * 1_000_000,

      weeklyWage: weeklyWageThousands * 1_000,
    };

    this.dialogRef.close(offer);
  }

  cancelOffer(): void {
    this.dialogRef.close();
  }
}
