package com.example.onlineexam;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.google.android.material.snackbar.Snackbar;

public class cameraclick extends AppCompatActivity {

    Button bb,re;
    ImageView imm;

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        Bitmap bitmap = (Bitmap)data.getExtras().get("data");
        imm.setImageBitmap(bitmap);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cameraclick);

        bb = (Button)findViewById(R.id.bb);
        re = findViewById(R.id.re);
        imm = (ImageView) findViewById(R.id.imm);

        bb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent33 = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(intent33,0);
            }
        });

        re.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent666 = new Intent(cameraclick.this,MainActivity.class);
                startActivity(intent666);


                Toast.makeText(cameraclick.this, "YOUR PICTURE SAVED IN OUR DATABASE", Toast.LENGTH_SHORT).show();
            }
        });


    }


}