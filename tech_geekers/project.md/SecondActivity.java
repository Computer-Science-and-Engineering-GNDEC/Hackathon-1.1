package com.example.onlineexam;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.media.MediaParser;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.material.floatingactionbutton.FloatingActionButton;


public class SecondActivity extends AppCompatActivity implements View.OnClickListener {
    Button sign_out;
    TextView name,email, id;
    Button tt;
    Button g,CAMM;
    ImageView uu;
    NotificationManager nm;
    FloatingActionButton cal;
    public static final int CAMERA_REQUEST=9999;



    @Override
    public void onBackPressed() {
        Toast.makeText(this, "ATTENTION ! - TEST MAY BE CANCLE IF YOU TRY TO GO BACK", Toast.LENGTH_SHORT).show();
        
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode==CAMERA_REQUEST){
            Bitmap bit = (Bitmap)data.getExtras().get("data");
            uu.setImageBitmap(bit);


        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);


        tt = findViewById(R.id.tt);

        tt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(v==tt){

                    Intent intent111 = new Intent(SecondActivity.this,testing.class);
                    startActivity(intent111);

                }
            }
        });


        uu =(ImageView) findViewById(R.id.uu);

        CAMM = findViewById(R.id.CAMM);

        CAMM.setOnClickListener(new  View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent55 = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(intent55,CAMERA_REQUEST);
            }
        });



        getSupportActionBar().setDisplayShowHomeEnabled(true);

        cal = findViewById(R.id.cal);



        cal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(v==cal){
                    Intent intent0 = new Intent(SecondActivity.this,calculator.class);
                    startActivity(intent0);
                }
            }
        });


        name = findViewById(R.id.name);
        email = findViewById(R.id.email);
        id = findViewById(R.id.id);
        sign_out = findViewById(R.id.sign_out);

        nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);




        g = findViewById(R.id.g);


        g.setOnClickListener(this);


        sign_out.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent1 = new Intent(SecondActivity.this,MainActivity.class);
                startActivity(intent1);
            }
        });



        GoogleSignInAccount acct = GoogleSignIn.getLastSignedInAccount(this);
        if (acct != null) {
            String personName = acct.getDisplayName();

            String personEmail = acct.getEmail();
            String personId = acct.getId();
            Uri personPhoto = acct.getPhotoUrl();

            name.setText(personName);
            email.setText(personEmail);
            id.setText(personId);
        }






    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        menu.add("Terms And Condition");
        return super.onCreateOptionsMenu(menu);

    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getTitle()=="Terms And Condition"){
Intent intent3 = new Intent(SecondActivity.this,TermsAndCondition.class);
startActivity(intent3);
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onClick(View v) {
        String channelId = "channelId";
        String channelname = " channel-name";
        NotificationCompat.Builder nb = new NotificationCompat.Builder(this,channelId);
        nb.setContentTitle("I HOPE YOU ARE READY-TECH_GREEKERS");
        nb.setSmallIcon(R.drawable.common_google_signin_btn_icon_dark);
        nb.setContentText("ALL IS WELL");

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationChannel nc = new NotificationChannel(channelId,channelname,NotificationManager.IMPORTANCE_DEFAULT);
            nm.createNotificationChannel(nc);
        }
        nm.notify((int) System.currentTimeMillis(),nb.build());
    }
}