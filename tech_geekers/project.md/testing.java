package com.example.onlineexam;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

public class testing extends AppCompatActivity {
    WebView joke;
    Button reddy;
    FloatingActionButton  cal;
    String iii = "https://docs.google.com/forms/d/1B0yxQJzPyQEJbPostXmgpgppizT1zQ-YGbT3vzTB890/edit";

    @Override
    public void onBackPressed() {
        Toast.makeText(this, "ATTENTION ! - TEST MAY BE CANCLE IF YOU TRY TO GO BACK", Toast.LENGTH_LONG).show();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_testing);

        cal = findViewById(R.id.cal);

        cal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(v==cal){
                    Intent intent = new Intent(testing.this,calculator.class);
                    startActivity(intent);
                }
            }
        });
        joke = findViewById(R.id.joke);

        reddy = findViewById(R.id.reddy);
        joke.getSettings().setJavaScriptEnabled(true);
        joke.setWebViewClient(new WebViewClient());

        reddy.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(v==reddy){
                    Toast.makeText(testing.this, "wait your test is loading...", Toast.LENGTH_SHORT).show();
                    joke.loadUrl(iii);






                }
            }
        });

    }
}